interface IFileInput {
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: React.FC<IFileInput> = ({ handleFileUpload }) => {
  return <input hidden type="file" onChange={handleFileUpload} />;
};

export default FileInput;
