interface TotalProps {
  children: number;
}
const Total = ({ children }: TotalProps) => {
  return (
    <div className="total">
      {t("total")}: {children}
    </div>
  );
};

export default Total;
