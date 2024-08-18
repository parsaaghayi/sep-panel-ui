# Avatar Component

The `Avatar` component is a customizable React component used to display a user avatar. It allows you to specify a custom image or use a default avatar.

## Installation

To use the `Avatar` component in your project, import it as follows:

````javascript
import Avatar from "./path-to-your-avatar-component/Avatar";```


## Props

The `Avatar` component accepts the following props:

| Prop Name  | Type   | Default Value | Description                                                                   |
|------------|--------|---------------|-------------------------------------------------------------------------------|
| `picUrl`   | string | `avatar.svg`  | URL of the image to be used as the avatar. If not provided, a default image is used. |
| `className`| string | `""`          | Additional CSS class names to apply to the avatar container.                  |


### Usage

Here's how you can use the `Avatar` component:

```javascript
import React from "react";
import Avatar from "./path-to-your-avatar-component/Avatar";

const UserProfile = () => {
  return (
    <div>
      <h1>User Profile</h1>
      <Avatar picUrl="https://example.com/user-pic.jpg" className="custom-avatar-class" />
    </div>
  );
};

export default UserProfile; ```

#### Example

Without custom `picUrl` and `className`:

```javascript
<Avatar /> ```

With custom `picUrl` and `className`:
```javascript
<Avatar picUrl="https://example.com/custom-avatar.jpg" className="my-custom-class" /> ```

##### Styling

The component's styling is defined in `style.css`. The `Avatar` component uses the following styles by default:

```css
.avatar-container {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
} ```

