export const Background = () => {
  return (
    <div className="relative" style={{ width: '500px', height: '500px' }}>
    {Array.from({ length: 5 }).map((_, rowIndex) =>
      Array.from({ length: 5 }).map((_, colIndex) => (
        <div
          key={`${rowIndex}-${colIndex}`}
          className="
            absolute 
            w-[100px] h-[100px] rounded-full border-4 border-gray-400
             hover:bg-gray-400
            animate-wave"
          style={{
            top: `${rowIndex * 100}px`,
            left: `${colIndex * 100}px`,
            animationDelay: `${(rowIndex + colIndex) * 0.4}s`,
          }}
        ></div>
      ))
    )}
  </div>
  )
}