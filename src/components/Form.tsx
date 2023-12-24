import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { UserIcon } from "@heroicons/react/20/solid";
import Input from "./Input";
import Select from "./Select";
import Button from "./Button";
import AssistiveText from "./AssistiveText";
import type FormValues from "../types/FormValues";
import type SelectOption from "../types/SelectOption";

interface FormProps {
  selectOptions: SelectOption[];
  onSuccess: (data: FormValues) => void;
}

const Form = ({ selectOptions, onSuccess }: FormProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<FormValues>();
  const [pokemon, setPokemon] = useState<SelectOption[]>([]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (pokemon.length !== 4) {
      setError("pokemon", {
        type: "manual",
        message: "Please select exactly 4 pokémon",
      });
      return;
    }

    onSuccess(data);
  };

  return (
    <form
      method="POST"
      className="flex h-fit flex-col items-center gap-4 rounded-lg border border-black bg-white p-8 shadow-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2">
        <Input
          name="name"
          register={register}
          icon={<UserIcon />}
          placeholder="Name"
          minLength={2}
          maxLength={12}
          pattern={/^[a-zA-Z]+$/}
          required
          error={!!errors.name}
        />
        {errors.name && (
          <AssistiveText error>{errors.name.message}</AssistiveText>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Input
          name="surname"
          register={register}
          icon={<UserIcon />}
          placeholder="Surname"
          minLength={2}
          maxLength={12}
          pattern={/^[a-zA-Z]+$/}
          required
          error={!!errors.surname}
        />
        {errors.surname && (
          <AssistiveText error>{errors.surname.message}</AssistiveText>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Select
          options={selectOptions}
          onChange={(value) => setPokemon(value as SelectOption[])}
          isMulti
          isSearchable
        />
        {errors.pokemon && (
          <AssistiveText error>{errors.pokemon.message}</AssistiveText>
        )}
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default Form;
