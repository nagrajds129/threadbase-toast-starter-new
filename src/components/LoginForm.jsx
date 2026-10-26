
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../context/ToastContext.jsx";
import { login } from "../api/mockApi.js";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { showToast } = useToast();

  const mutation = useMutation({
    mutationFn: login,

    // Show a success toast
    onSuccess: () => {
      showToast("Welcome back!", "success");
    },

    // Show an error toast
    onError: (error) => {
      const message =
        error.response?.data?.message || "Login failed. Please try again.";

      showToast(message, "error");
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    mutation.mutate({ username, password });
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Log in</h2>

      <p className="hint">
        Correct login: <code>ada</code> / <code>password</code>. Anything else triggers an
        error toast.
      </p>

      <input
        className="input"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        className="input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="btn"
        type="submit"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Logging in..." : "Log in"}
      </button>
    </form>
  );
}
