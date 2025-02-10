export const Background = () => {
  return (
    <div className="absolute -translate-x-2/3" style={{ width: '500px', height: '500px' }}>
    {Array.from({ length: 5 }).map((_, rowIndex) =>
      Array.from({ length: 7 }).map((_, colIndex) => (
        <div
          key={`${rowIndex}-${colIndex}`}
          className="
            absolute 
            w-[100px] h-[100px] rounded-full border-4 border-primary-200
             hover:bg-background
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