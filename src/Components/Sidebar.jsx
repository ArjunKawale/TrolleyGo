import "./Sidebar.css";

export const Sidebar = ({ value, onClose }) => {
  return (
    <>
     
      <div className={`overlay ${value ? "open" : ""}`} onClick={onClose}></div>


      <div className={`sidebarbase ${value ? "open" : ""}`}>
        
      </div>
    </>
  );
};
