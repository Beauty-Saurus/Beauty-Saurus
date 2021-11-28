import { useLocation } from "@docusaurus/router";
import DeleteIconColor from "@site/src/asset/DeleteIconColor";
import UploadIconColor from "@site/src/asset/UploadIconColor";
import client from "@site/src/lib/api/client";
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./DragDrop.module.css";

interface Props {
  children?: any;
}

const DragDrop = ({ children }: Props): JSX.Element => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const location = useLocation();

  const dragRef = useRef<HTMLInputElement | null>(null);

  const handleDragIn = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    console.log("handleDragIn");
  }, []);

  const handleDragOut = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    dragRef.current.style.border = "1px #545454 dashed";
    console.log("handleDragOut");
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    console.log("handleDragOver");
    dragRef.current.style.border = "2px #0168fa dashed";
    dragRef.current.style.background = "#ddeafc";
    if (e.dataTransfer.files) setIsDragging(true);
  }, []);

  const onChangeFiles = useCallback(
    (e: ChangeEvent<HTMLInputElement> | any): void => {
      let selectFiles: File[] = [];
      if (e.type === "drop") {
        selectFiles = e.dataTransfer.files;
        const data = new FormData();
        const href = location.pathname.split("/").pop();
        data.append("navName", href);
        data.append("positionNum", "");
        [...selectFiles].forEach((file) => {
          data.append("dropFile", file);
        });
        // data.append("dropFile", e.dataTransfer.files[0]);
        const resData = client.post("/api/file/markdown", data).then((res) => {
          const data = res.data;
          console.log("markdown Response Data", data);
          return data;
        });
        console.log("resData", resData);
      }
    },
    [location.pathname]
  );

  const handleDrop = useCallback(
    (e: DragEvent): void => {
      e.preventDefault();
      e.stopPropagation();
      dragRef.current.style.border = "1px #545454 dashed";
      console.log("handleDrop");
      onChangeFiles(e);
      setIsDragging(false);
    },
    [onChangeFiles]
  );

  const initDragEvents = useCallback((): void => {
    console.log("initDragEvents", dragRef.current);

    if (dragRef.current !== null) {
      dragRef.current.addEventListener("dragenter", handleDragIn);
      dragRef.current.addEventListener("dragleave", handleDragOut);
      dragRef.current.addEventListener("dragover", handleDragOver);
      dragRef.current.addEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  const resetDragEvents = useCallback((): void => {
    console.log("resetDragEvents");

    if (dragRef.current !== null) {
      dragRef.current.removeEventListener("dragenter", handleDragIn);
      dragRef.current.removeEventListener("dragleave", handleDragOut);
      dragRef.current.removeEventListener("dragover", handleDragOver);
      dragRef.current.removeEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  useEffect(() => {
    initDragEvents();
    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents]);

  return (
    <>
      <div className={styles.dragDrop} ref={dragRef}>
        <input className={styles.hidden} type="file" multiple />
        <div>
          <UploadIconColor /> Drag and Drop your Files!
        </div>
      </div>
      {children}
    </>
  );
};

export default DragDrop;
