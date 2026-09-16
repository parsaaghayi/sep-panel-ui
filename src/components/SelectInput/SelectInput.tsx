import React, { useState, useRef, useEffect } from "react";
import "./style.css";

type optionType = {
  label: string;
  value: string | number;
};

type SelectInputPropsType = {
  label?: string;
  iconSrc?: string;
  placeHolder?: string;
  className?: string;
  required?: boolean;
  menuItems: optionType[];
  disabled?: boolean;
  selectedOption: optionType | null;
  setSelectedOption: React.Dispatch<React.SetStateAction<optionType | null>>;
  onChange: (option: optionType | null) => void;
};

const SelectInput: React.FC<SelectInputPropsType> = ({
  label,
  iconSrc,
  className,
  placeHolder,
  required,
  menuItems,
  disabled,
  selectedOption,
  setSelectedOption,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  function openMenu() {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        // Set initial highlighted index when opening
        const currentIndex = selectedOption
          ? menuItems.findIndex((item) => item.value === selectedOption.value)
          : -1;
        setHighlightedIndex(currentIndex >= 0 ? currentIndex + 1 : 0);
      }
    }
  }

  function setSelectedOptionValue(option: optionType) {
    onChange(option);
    setIsOpen(false);
    setSelectedOption(option);
    setHighlightedIndex(-1);
  }

  function setSelectedOptionValueToNull() {
    onChange(null);
    setIsOpen(false);
    setSelectedOption(null);
    setHighlightedIndex(-1);
  }

  // Get all menu items including placeholder
  const allMenuItems = [
    { label: placeHolder || "", value: null, isPlaceholder: true },
    ...menuItems,
  ];

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case "Enter":
      case " ": // Space
        event.preventDefault();
        if (!isOpen) {
          openMenu();
        } else if (highlightedIndex >= 0) {
          if (highlightedIndex === 0) {
            setSelectedOptionValueToNull();
          } else {
            setSelectedOptionValue(menuItems[highlightedIndex - 1]);
          }
        }
        break;

      case "ArrowDown":
        event.preventDefault();
        if (!isOpen) {
          openMenu();
        } else {
          setHighlightedIndex((prev) => {
            const nextIndex = prev < allMenuItems.length - 1 ? prev + 1 : 0;
            scrollToItem(nextIndex);
            return nextIndex;
          });
        }
        break;

      case "ArrowUp":
        event.preventDefault();
        if (isOpen) {
          setHighlightedIndex((prev) => {
            const nextIndex = prev > 0 ? prev - 1 : allMenuItems.length - 1;
            scrollToItem(nextIndex);
            return nextIndex;
          });
        }
        break;

      case "Escape":
        event.preventDefault();
        if (isOpen) {
          setIsOpen(false);
          setHighlightedIndex(-1);
          inputRef.current?.focus();
        }
        break;

      case "Home":
        if (isOpen) {
          event.preventDefault();
          setHighlightedIndex(0);
          scrollToItem(0);
        }
        break;

      case "End":
        if (isOpen) {
          event.preventDefault();
          const lastIndex = allMenuItems.length - 1;
          setHighlightedIndex(lastIndex);
          scrollToItem(lastIndex);
        }
        break;

      default:
        break;
    }
  };

  // Scroll to highlighted item
  const scrollToItem = (index: number) => {
    const itemRef = menuItemRefs.current[index];
    if (itemRef && menuRef.current) {
      const menu = menuRef.current;
      const itemTop = itemRef.offsetTop;
      const itemBottom = itemTop + itemRef.offsetHeight;
      const menuTop = menu.scrollTop;
      const menuBottom = menuTop + menu.clientHeight;

      if (itemTop < menuTop) {
        menu.scrollTop = itemTop;
      } else if (itemBottom > menuBottom) {
        menu.scrollTop = itemBottom - menu.clientHeight;
      }
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Reset highlighted index when menu closes
  useEffect(() => {
    if (!isOpen) {
      setHighlightedIndex(-1);
      // Reset refs array
      menuItemRefs.current = [];
    }
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className={`selectInput-container ${disabled ? "disabled" : ""} ${
        className ? className : ""
      }`}
    >
      <div className="selectInput-title">
        <div className="selectInput-title-text" onClick={openMenu}>
          {label}
        </div>
        {required ? (
          <span className="selectInput-title-required" onClick={openMenu}>
            *
          </span>
        ) : null}
      </div>
      <div
        ref={inputRef}
        className="selectInput-input"
        onClick={openMenu}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls="selectInput-menu"
        aria-label={label || placeHolder}
      >
        {iconSrc && <img src={iconSrc} alt="first icon for input" />}
        {selectedOption == null ? (
          <div className="selectInput-input-placeholder">{placeHolder}</div>
        ) : (
          <div className="selectInput-input-text">{selectedOption.label}</div>
        )}

        <span className="selectInput-input-dropdownIcon"></span>
      </div>
      {isOpen ? (
        <div ref={menuRef} className="selectInput-menu" id="selectInput-menu" role="listbox">
          <div
            ref={(el) => { menuItemRefs.current[0] = el; }}
            className={`selectInput-menu-menuItem ${highlightedIndex === 0 ? "highlighted" : ""}`}
            key={0}
            onClick={() => setSelectedOptionValueToNull()}
            onMouseEnter={() => setHighlightedIndex(0)}
            role="option"
            aria-selected={selectedOption === null}
          >
            {placeHolder}
          </div>
          {menuItems.map((menuItem: optionType, key: number) => {
            const itemIndex = key + 1;
            const isSelected = selectedOption?.value === menuItem.value;
            return (
              <div
                ref={(el) => { menuItemRefs.current[itemIndex] = el; }}
                className={`selectInput-menu-menuItem ${
                  highlightedIndex === itemIndex ? "highlighted" : ""
                } ${isSelected ? "selected" : ""}`}
                key={itemIndex}
                onClick={() => setSelectedOptionValue(menuItem)}
                onMouseEnter={() => setHighlightedIndex(itemIndex)}
                role="option"
                aria-selected={isSelected}
              >
                {menuItem.label}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default SelectInput;
