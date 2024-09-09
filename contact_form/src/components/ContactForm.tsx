import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ContactForm = ({ updateCallback }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const existingContact = location.state?.existingContact || {};

  const [firstName, setFirstName] = useState(existingContact.firstName || "");
  const [lastName, setLastName] = useState(existingContact.lastName || "");
  const [email, setEmail] = useState(existingContact.email || "");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const updating = Object.entries(existingContact).length !== 0;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      firstName,
      lastName,
      email,
    };

    const url = `http://127.0.0.1:5000/${
      updating ? `update_contact/${existingContact.id}` : "contacts"
    }`;
    const options = {
      method: updating ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, options);

      if (response.ok) {
        setMessage(
          updating
            ? "Contact updated successfully!"
            : "Contact created successfully!"
        );
        setFirstName("");
        setLastName("");
        setEmail("");
        updateCallback();
        navigate("/");
      } else {
        const data = await response.json();
        setError(data.message || "Failed to send data");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An unexpected error occurred.");
    }
  };

  const backgroundStyle = {
    backgroundImage: "url('/bg.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    width: "100vw",
  };

  return (
    <div
      className="h-screen w-full flex justify-center items-center bg-transparent"
      style={backgroundStyle}
    >
      <div className="flex flex-col space-y-3 mx-10 w-full max-w-md">
        {message && (
          <div className="mb-4 p-2 bg-green-500 text-white rounded-md">
            {message}
          </div>
        )}
        {error && (
          <div className="mb-4 p-2 bg-red-500 text-white rounded-md">
            {error}
          </div>
        )}
        <form
          className="flex flex-col space-y-3 border items-center border-r-slate-400 rounded-md p-6 backdrop-blur-md bg-white/50"
          onSubmit={onSubmit}
        >
          <h1 className="font-semibold text-lg text-center">
            {updating ? "Edit Contact" : "Create Contact"}
          </h1>
          <input
            type="text"
            placeholder="First name*"
            className="border p-2 w-96 rounded-md"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last name*"
            className="border p-2 w-96 rounded-md"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email*"
            className="border p-2 w-96 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 w-40 rounded-full"
            type="submit"
          >
            {updating ? "Update" : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
