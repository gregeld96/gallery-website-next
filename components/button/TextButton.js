
function TextButton({ title, onClick, loading }) {
  return (
    <button disabled={loading} onClick={loading ? null : onClick} className="bg-[#07638d] w-full min-h-[45px] lg:w-full font-bold p-2 rounded text-center text-white">
      <p className="text-[12px]">{title}</p>
    </button>
  );
}
  
  export default TextButton;
  