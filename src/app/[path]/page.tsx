"use client";

import { DefaultEventsMap } from "@socket.io/component-emitter";
import { useEffect, use, useState } from "react";
import io, { Socket } from "socket.io-client";
let socket: Socket<DefaultEventsMap, DefaultEventsMap>;
let debounceTimeout: string | number | NodeJS.Timeout | null | undefined = null;

export default function Folder(props: { params: Promise<{ path: string }> }) {
  const [padValue, setPadValue] = useState("");
  const params = use(props.params);

  const getInitalContentFolder = async () => {
    const result = (await (await fetch(`/api/content/${params.path}`)).json())[0];
    if (result) {
      setPadValue(result.content);
    }
  };

  const socketInitializer = async () => {
    await fetch("/api/websocket");
    socket = io();

    socket.on(`padUpdate-${params.path}`, (value) => {
      setPadValue(value.content);
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPadValue(event.target.value);
    if (!!debounceTimeout) clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      socket.emit("padChange", { path: params.path, content: event.target.value });
    }, 1000);
  };

  useEffect(() => {
    getInitalContentFolder();
    socketInitializer();
  }, []);

  return (
    <div className="size-full h-screen">
      <main className="size-full flex flex-col gap-8 row-start-2 p-5 items-center sm:items-start">
        <h1>Folder: {params.path}</h1>
        <div className="size-full">
          <textarea className="size-full p-2" onChange={handleChange} value={padValue} />
        </div>
      </main>
    </div>
  );
}
