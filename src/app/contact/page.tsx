"use client";

import React, { useState } from "react";
import { Input, Textarea, Button, Card, Spacer } from "@nextui-org/react";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Message sent successfully");
        // Clear the form
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Error sending email");
      }
    } catch (error) {
      toast.error("Error sending message");
    }
  };

  return (
    <div className="grid grid-rows gap-4">
      <div>
        <h1 className="text-4xl font-bold text-center">Contact Me</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Spacer y={3} />
          <Input
            type="email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Spacer y={3} />
          <Textarea
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <Spacer y={3} />
          <Button className="w-full" type="submit" color="primary">
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}
