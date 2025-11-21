import React from "react";

export default function Profile() {
  // Later you can replace these with real user data from your backend or context
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    bio: "Passionate about gender equality and youth empowerment.",
    role: "Youth Member",
    joined: "Nov 2025",
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1>My Profile</h1>
      <div style={{ marginTop: "1rem", lineHeight: "1.8" }}>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Bio:</strong> {user.bio}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Joined:</strong> {user.joined}</p>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <button style={{ marginRight: "1rem" }}>Edit Profile</button>
        <button>Logout</button>
      </div>
    </div>
  );
}
