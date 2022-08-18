import React, { useReducer } from 'react'
import useStore from '../../../../store'
import { noEmptyFields } from "../../../../helpers/helper";
import { LodinFormProps, LoginActionProps } from '../../../../interfaces'

enum ActionTypes {
  ENTER_DATA = 'ENTER_DATA'
}

const initialArguments = {
  data: {
    email: "",
    password: ""
  },
  isValid: false
};

function reducer(state: any, action: LoginActionProps) {
  switch (action.type) {
    case "ENTER_DATA": {
      const { name, value } = action.payload;
      const data = { ...state.data, [name]: value };
      const isValid = noEmptyFields(data);
      return {
        ...state,
        data,
        isValid
      };
    }
    default:
      break;
  }
};

const LodinForm: React.FC<LodinFormProps> = ({ onLoggedIn }) => {
  const [form, dispatch] = useReducer(reducer, initialArguments);
  const logIn = useStore(state => state.logIn)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({
      type: ActionTypes.ENTER_DATA,
      payload: {
        name: e.target.name,
        value: e.target.value
      }
    });

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    logIn(form.data.email)
    onLoggedIn()
  }

  return (
    <div className="p-5 bg-white md:flex-1">
      <h3 className="mb-4 text-2xl font-semibold text-gray-700">Account Login</h3>
      <form onSubmit={handleLogin} className="flex flex-col space-y-5" autoComplete="off">
        <div className="flex flex-col space-y-1">
          <label htmlFor="email" className="text-sm font-semibold text-gray-500">Email</label>
          <input
            autoComplete="off"
            type="email"
            name="email"
            autoFocus
            onChange={handleChange}
            value={form?.data?.email}
            className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="password" className="text-sm font-semibold text-gray-500">Password</label>
          <input
            autoComplete="new-password"
            type="password"
            name="password"
            onChange={handleChange}
            value={form?.data?.password}
            className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>
        <div>
          <button
            disabled={!form.isValid}
            type="submit"
            className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  )
}
export default LodinForm