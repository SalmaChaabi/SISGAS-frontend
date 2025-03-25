import { Button, TextField, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import React, { useEffect } from "react";
import { User } from "../../../services/users/getAllUsers";
import {
  AddUserAdminType,
  AddUserAdminTypeResponse,
} from "../../../services/users/addUserAdmin";

type UserFormProps = {
  onSubmit: (user: AddUserAdminType) => Promise<AddUserAdminTypeResponse>;
  defaultData?: User;
  submitLabel?: string;
};
const UserForm = ({ onSubmit, defaultData, submitLabel }: UserFormProps) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(false);

  const [response, setResponse] =
    React.useState<AddUserAdminTypeResponse | null>(null);
  // Vérification des entrées
  const firstNameError =
    firstName.length < 2 ? "Le prénom doit avoir au moins 2 caractères" : "";
  const lastNameError =
    lastName.length < 2 ? "Le nom doit avoir au moins 2 caractères" : "";
  const emailError = email.includes("@")
    ? ""
    : "Email invalide (doit contenir @)";
  const passwordError =
    password.length < 8
      ? "Le mot de passe doit avoir au moins 8 caractères"
      : "";

  const isFormError =
    firstNameError ||
    lastNameError ||
    emailError ||
    (passwordError && defaultData == undefined);

  const handleSubmit = async () => {
    if (isFormError) {
      console.log("Formulaire invalide");
      setError(true);
    } else {
      try {
        setError(false);
        const res = await onSubmit({
          firstName,
          lastName,
          email,
          password,
        });
        setResponse(res);
      } catch (error) {
        console.error("Erreur lors de l’ajout de l’utilisateur", error);
        setError(true);
      }
      // Ici, envoyer les données au backend
    }
  };
  useEffect(() => {
    if (defaultData?.firstName) {
      setFirstName(defaultData.firstName);
    }
    if (defaultData?.lastName) {
      setLastName(defaultData.lastName);
    }

    if (defaultData?.email) {
      setEmail(defaultData.email);
    }

    if (defaultData?.email) {
      setEmail(defaultData.email);
    }
  }, [defaultData]);
  return (
    <Stack spacing={2}>
      <TextField
        label="FirstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        helperText={firstNameError}
        error={!!firstNameError}
      />
      <TextField
        label="LastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        helperText={lastNameError}
        error={!!lastNameError}
      />

      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        helperText={emailError}
        error={!!emailError}
      />
      {defaultData == undefined && (
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          helperText={passwordError}
          error={!!passwordError}
        />
      )}
      <Button variant="contained" type="submit" onClick={handleSubmit}>
        {submitLabel ?? "submit"}
      </Button>
      {response && (
        <Typography color={response.success ? "success" : "error"}>
          {response.message}
        </Typography>
      )}
    </Stack>
  );
};

export default UserForm;
