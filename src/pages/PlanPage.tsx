import { Link } from "react-router-dom";

export const PlanPage = () => {
  return (
    <>
      <h1>PlanPage</h1>

      <div style={{display: 'flex', alignItems: 'center', columnGap: '15px'}}>
        <h2>Target</h2>
        <Link to='/new-target'>+</Link>
      </div>

      <div style={{display: 'flex', alignItems: 'center', columnGap: '15px'}}>
        <h2>Budget</h2>
        <Link to='/new-budget'>+</Link>
      </div>
    </>
  );
};
