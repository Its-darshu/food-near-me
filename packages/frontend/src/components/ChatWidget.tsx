import { useState } from "react";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="w-72 rounded-3xl bg-white/95 p-4 shadow-2xl">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="font-display text-lg font-semibold text-secondary">
              Need help finding a shop?
            </h4>
            <button
              type="button"
              className="rounded-full bg-secondary/10 p-2 text-secondary"
              onClick={toggle}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>
          <p className="mb-3 text-sm text-secondary/70">
            Ask our support assistant anything. We typically reply within a minute.
          </p>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Hi! I'm looking for street food near MG Road."
            className="h-24 w-full resize-none rounded-2xl border border-secondary/10 bg-cream/60 p-3 text-sm text-secondary focus:border-primary focus:outline-none"
          />
          <button
            type="button"
            className="mt-3 w-full rounded-full bg-primary py-2 font-semibold text-white transition hover:opacity-90"
          >
            Send message
          </button>
        </div>
      )}
      <button
        type="button"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-2xl text-white shadow-xl transition hover:scale-105"
        onClick={toggle}
        aria-label="Open chat"
      >
        💬
      </button>
    </div>
  );
};

export default ChatWidget;
