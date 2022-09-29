import * as icon from "react-icons/io5";
import { Button } from "flowbite-react";
import { useContext, useState } from "react";
import { ModalContext } from "../../contexts/create.context";

export function Menu() {
  const { setIsOpenModal } = useContext(ModalContext);
  return (
    <div>
      <a href="/" target="_blank">
        <img src="/logo.png" className="logo" alt="Vite logo" />
      </a>

      <div className="buttonsContent">
        <Button color="failure" size="xl" onClick={() => setIsOpenModal(true)}>
          <icon.IoGameController className="mr-2 h-5 w-5" />
          New Game
        </Button>
        <Button color="light" size="xl">
          <icon.IoLogoGithub className="mr-2 h-5 w-5" />
          GitHub
        </Button>
        <Button color="dark" size="xl">
          <icon.IoHelpCircle className="mr-2 h-5 w-5" />
          About
        </Button>
      </div>
    </div>
  );
}
