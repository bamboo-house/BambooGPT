export const RightSidebar = ({ showRightSidebar }: { showRightSidebar: boolean }) => {
  const showClass = showRightSidebar
    ? 'w-64 flex-none transition-alltransition-all duration-300 ease-in-out'
    : 'w-0 transition-all duration-300 ease-in-out';
  return (
    <div className={showClass}>
      <div className="fixed h-full w-[inherit] bg-blue-500">ll</div>
    </div>
  );
};
