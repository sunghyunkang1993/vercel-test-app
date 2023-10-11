import './styles.scss';
import { useForm } from "react-cool-form";
import { useSearchParams } from "react-router-dom"; 

const Field = ({ label, id, ...rest }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <input id={id} {...rest} />
  </div>
);

const Select = ({ label, id, children, ...rest }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <select id={id} {...rest}>
      {children}
    </select>
  </div>
);

const Textarea = ({ label, id, ...rest }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <textarea id={id} {...rest} />
  </div>
);

const calculateEstimateMonthlyPayment = (values) => {
  const monthlyIncome = parseFloat(values.income) / 12;
  const feMinCalculation = 0.28 * monthlyIncome;
  const feMaxCalculation = 0.31 * monthlyIncome;
  const beMinCalculation = (0.36 * monthlyIncome) - parseFloat(values.debt);
  const beMaxCalculation = (0.43 * monthlyIncome) - parseFloat(values.debt);
  return (feMinCalculation + feMaxCalculation + beMinCalculation + beMaxCalculation) / 4
}

const calculateAffordability = (downpayment, monthlyPayment, interest) => {
  const affordability = (monthlyPayment * ((((1 + interest) ** 360) - 1) / (interest * (1 + interest) ** 360)) * 10) + downpayment
  return affordability
}

const onSubmit = (values) => {
  const estimatedMonthlyPayment = calculateEstimateMonthlyPayment(values)
  const affordability = calculateAffordability(parseFloat(values.downpayment), estimatedMonthlyPayment, parseFloat(values.interest))
  alert(affordability)
}

function App() {
  // const [searchParams] = useSearchParams();
  // console.log(searchParams.get("id"));
  const { form } = useForm({
    defaultValues: { firstName: "", lastName: "", email: "", income: "", debt: "", interest: "", downpayment: "" },
    onSubmit: (values) => onSubmit(values)
  });
  return (
    <form ref={form}>
      <Field label="First Name" id="first-name" name="firstName" />
      <Field label="Last Name" id="last-name" name="lastName" />
      <Field label="Email" id="email" name="email" />
      <Select label="Income" id="income" name="income">
        <option value="50000">$50,000</option>
        <option value="60000">$60,000</option>
        <option value="70000">$70,000</option>
        <option value="80000">$80,000</option>
        <option value="90000">$90,000</option>
        <option value="100000">$100,000</option>
        <option value="110000">$110,000</option>
        <option value="120000">$120,000</option>
        <option value="130000">$130,000</option>
        <option value="140000">$140,000</option>
        <option value="150000">$150,000</option>
        <option value="160000">$160,000</option>
        <option value="170000">$170,000</option>
        <option value="180000">$180,000</option>
        <option value="190000">$190,000</option>
        <option value="200000">$200,000</option>
      </Select>
      <Select label="Monthly Debt" id="debt" name="debt">
        <option value="0">$0</option>
        <option value="500">$500</option>
        <option value="1000">$1000</option>
        <option value="1500">$1500</option>
        <option value="2000">$2000</option>
        <option value="2500">$2500</option>
        <option value="3000">$3000</option>
        <option value="3500">$3500</option>
        <option value="4000">$4000</option>
        <option value="4500">$4500</option>
        <option value="5000">$5000</option>
      </Select>
      <Select label="Credit Score" id="interest" name="interest">
        <option value="0.09068">620-639</option>
        <option value="0.08522">640-659</option>
        <option value="0.08092">660-679</option>
        <option value="0.07878">680-699</option>
        <option value="0.07701">700-759</option>
        <option value="0.07479">760-850</option>
      </Select>
      <Select label="Down Payment" id="downpayment" name="downpayment">
        <option value="0">0</option>
        <option value="10000">10000</option>
        <option value="20000">20000</option>
        <option value="30000">30000</option>
        <option value="40000">40000</option>
        <option value="50000">50000</option>
        <option value="60000">60000</option>
        <option value="70000">70000</option>
        <option value="80000">80000</option>
        <option value="90000">90000</option>
        <option value="100000">100000</option>
      </Select>
      <input type="submit" />
    </form>
  );
}

export default App;
