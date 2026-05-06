import { useEffect } from "react";

function Hearts() {
  useEffect(() => {
    const interval = setInterval(() => {
      const heart = document.createElement("div");
      heart.innerHTML = "💖";
      heart.style.position = "fixed";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.top = "100vh";
      heart.style.fontSize = "20px";
      heart.style.animation = "floatUp 4s linear";
      heart.style.zIndex = "999";

      document.body.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 4000);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return null;
}

export default Hearts;