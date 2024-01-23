import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { categories } from "./categories";

const scema = z.object({
  description: z
    .string()
    .min(3, { message: "Description must contain at least 3 characters." })
    .max(50, { message: "Your description is too long." }),
  amount: z.number({ invalid_type_error: "Amount is required." }),
  category: z.enum(categories, {
    errorMap: () => ({ message: " Category is required." }),
  }),
});

type FormData = z.infer<typeof scema >;

interface Props {
  onSubmit: (data: FormData) => void;
}

const Form = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(scema) });

  return (
    <form onSubmit={handleSubmit(data =>{
        onSubmit(data);
        reset();
    })}>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          {...register("description")}
          id="description"
          type="text"
          className="form-control"
        />
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          {...register("amount", { valueAsNumber: true })}
          type="number"
          id="amount"
          className="form-control"
        />
        {errors.amount && (
          <p className="text-danger">{errors.amount.message}</p>
        )}
      </div>

      <div className="mb-3 ">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select
          {...register("category")}
          id="category"
          className="form-select form-select "
        >
          <option selected></option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-danger">{errors.category.message}</p>
        )}
      </div>

      <button type="submit" className="btn btn-primary mb-3">
        Submit
      </button>
    </form>
  );
};

export default Form;
