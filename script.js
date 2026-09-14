const CA = "0x10b341acfe71315d8eedd193f1160e780c94e462";
const copyBtn = document.getElementById("copyBtn");
const navToggle = document.querySelector(".nav-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const addNetwork = document.getElementById("addNetwork");
const gen = document.getElementById("gen");

async function copyCA() {
  try {
    await navigator.clipboard.writeText(CA);
    copyBtn.textContent = "Copied";
  } catch {
    const field = document.getElementById("ca");
    const range = document.createRange();
    range.selectNodeContents(field);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("copy");
    copyBtn.textContent = "Copied";
  }
  setTimeout(() => {
    copyBtn.textContent = "Copy";
  }, 1600);
}

copyBtn?.addEventListener("click", copyCA);

navToggle?.addEventListener("click", () => {
  const open = mobileMenu.hasAttribute("hidden") === false;
  if (open) {
    mobileMenu.setAttribute("hidden", "");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  } else {
    mobileMenu.removeAttribute("hidden");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Close menu");
  }
});

mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.setAttribute("hidden", "");
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "Open menu");
  });
});

addNetwork?.addEventListener("click", async () => {
  if (!window.ethereum) {
    addNetwork.textContent = "Install a wallet";
    setTimeout(() => {
      addNetwork.textContent = "Add network";
    }, 1800);
    return;
  }
  try {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: "0x1237",
          chainName: "Robinhood Chain",
          nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
          rpcUrls: ["https://rpc.mainnet.chain.robinhood.com"],
          blockExplorerUrls: ["https://robinhoodchain.blockscout.com"],
        },
      ],
    });
    addNetwork.textContent = "Added";
  } catch {
    addNetwork.textContent = "Rejected";
  }
  setTimeout(() => {
    addNetwork.textContent = "Add network";
  }, 1800);
});

if (gen && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let n = 0;
  setInterval(() => {
    n = (n + 1) % 100;
    gen.textContent = String(n).padStart(2, "0");
  }, 900);
}
