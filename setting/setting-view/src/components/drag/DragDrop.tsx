import client from "@site/src/lib/api/client";
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type FileType = {
  id: number;
  object: File;
};

const DragDrop = (): JSX.Element => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [files, setFiles] = useState<FileType[]>([]);

  const fileId = useRef<number>(1);

  const dragRef = useRef<HTMLInputElement | null>(null);

  const handleDragIn = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    console.log("handleDragIn");
  }, []);

  const handleDragOut = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    console.log("handleDragOut");
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    console.log("handleDragOver");
    if (e.dataTransfer.files) setIsDragging(false);
  }, []);

  const onChangeFiles = useCallback(
    (e: ChangeEvent<HTMLInputElement> | any): void => {
      let selectFiles: File[] = [];
      let tempFiles: FileType[] = files;

      console.log("onChangeFiles");
      if (e.type === "drop") {
        selectFiles = e.dataTransfer.files;
        const data = new FormData();
        data.append("dropFile", e.dataTransfer.files[0]);
        console.log(selectFiles, data.append);
        client.post("/api/file/markdown");
      } else {
        selectFiles = e.target.files;
      }

      for (const file of selectFiles) {
        tempFiles = [
          ...tempFiles,
          {
            id: fileId.current++,
            object: file,
          },
        ];
      }

      setFiles(tempFiles);
    },
    [files]
  );

  const handleDrop = useCallback(
    (e: DragEvent): void => {
      e.preventDefault();
      e.stopPropagation();
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
    <div className="dragDrop">
      <input type="file" id="fileUpload" multiple ref={dragRef} />
      <label
        className={isDragging ? "dragDrop-file-dragging" : "dragDrop-file"}
        htmlFor="fileUpload"
      ></label>
      <div className="dragDrop-files">
        {files.length > 0 &&
          files.map((file: FileType) => {
            const {
              id,
              object: { name },
            } = file;

            return (
              <div key={id}>
                <div>{name}</div>
                <div className="dragDrop-files-filter">X</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DragDrop;
