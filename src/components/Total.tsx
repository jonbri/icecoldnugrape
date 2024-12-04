export interface TotalProps {
  children: number;
}
export const Total = ({ children }: TotalProps) => (
  <div className="total">Total: {children}</div>
);
