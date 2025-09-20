export type FilePasswordState = {
    password: string;
    correct?: boolean;
};

export type FileState = "loading" | "loaded" | "uploading" | "uploaded" | "error";

export type UserFile = {
    file: File;
    id: string;
    state: FileState;
    passwordState?: FilePasswordState;
    error?: string;
};

export interface FilesContextType {
    files: UserFile[];
    addFile: (newFiles: File[]) => void;
    removeFile: (file: UserFile) => void;
    updateFile: (file: UserFile) => void;
}
