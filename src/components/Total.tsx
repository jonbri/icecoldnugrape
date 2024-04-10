interface TotalProps {
  children: number;
}
const Total = ({ children }: TotalProps) => (
  <div className="total">Total: {children}</div>
);

export default Total;
