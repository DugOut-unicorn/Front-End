const Sidebar = () => {
  return (
    <div className="h-[calc(100vh-4rem)] w-100">
      <div className="flex h-14 items-center border-b border-[var(--divider-dv2)] bg-[var(--surface-1)]">
        <h3 className="t-h3 mx-4 text-[var(--on-surface-default)]">채팅</h3>
      </div>
      <div className="flex h-22 w-full items-center bg-[var(--surface-1)] p-5">
        <div className="flex-row"></div>
      </div>
    </div>
  );
};

export default Sidebar;
