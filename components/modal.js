
export default function (element, bool) {

  const isOpenClass = "modal-is-open";
  const openingClass = "modal-is-opening";
  const closingClass = "modal-is-closing";
  const scrollbarWidthCssVar = "--pico-scrollbar-width";
  const animationDuration = 0; // ms
  let visibleModal = null;

  element.addEventListener("click", (event) => {
    event.preventDefault();
    const modal = document.getElementById(event.currentTarget.dataset.target);

    if (!modal) return;
    modal && (isModalOpen(modal) ? closeModal(modal) : openModal(modal));
  });


  // Is modal open
  const isModalOpen = (modal) =>
    modal.hasAttribute("open") && modal.getAttribute("open") !== "false";

  // Open modal
  const openModal = (modal) => {
    const { documentElement: html } = document;
    const scrollbarWidth = getScrollbarWidth();
    if (scrollbarWidth) {
      html.style.setProperty(scrollbarWidthCssVar, `${scrollbarWidth}px`);
    }
    html.classList.add(isOpenClass, openingClass);
    setTimeout(() => {
      visibleModal = modal;
      html.classList.remove(openingClass);
    }, animationDuration);
    modal.setAttribute("open", true);
  };

  // Close modal
  const closeModal = (modal) => {
    visibleModal = null;
    const { documentElement: html } = document;
    html.classList.add(closingClass);
    setTimeout(() => {
      html.classList.remove(closingClass, isOpenClass);
      html.style.removeProperty(scrollbarWidthCssVar);
      modal.removeAttribute("open");
    }, animationDuration);
  };

  // Close with a click outside
  document.addEventListener("click", (event) => {
    if (visibleModal === null) return;
    const modalContent = visibleModal.querySelector("article");
    const isClickInside = modalContent.contains(event.target);
    !isClickInside && closeModal(visibleModal);
  });

  // Close with Esc key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && visibleModal) {
      closeModal(visibleModal);
    }
  });

  // Get scrollbar width
  const getScrollbarWidth = () => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    return scrollbarWidth;
  };

  // Is scrollbar visible
  const isScrollbarVisible = () => {
    return document.body.scrollHeight > screen.height;
  };
 

}
