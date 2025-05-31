import React, { useState } from "react";
import { Box, Button, TextField, Select, MenuItem, InputLabel, FormControl, SelectChangeEvent } from "@mui/material";
import { ActionCorrectiveType } from "../../../services/actionsCorrectives/types";

interface Props {
  onSubmit: (data: ActionCorrectiveType) => void;
  defaultData: ActionCorrectiveType;
  submitLabel?: string;
  statuts?: any[]; 
}

export default function ActionCorrectiveForm({ onSubmit, defaultData, submitLabel }: Props) {
  const [formData, setFormData] = useState<ActionCorrectiveType>(defaultData);

  React.useEffect(() => {
    setFormData(defaultData);
  }, [defaultData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { value: unknown }>
  ) => {
    const { name, value } = e.target as HTMLInputElement; 
    setFormData({ ...formData, [name]: value });
  };

  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      
      {/* <TextField
        name="dateAction"
        label="Date Action"
        type="date"
        value={formData.dateAction ? formData.dateAction.toString().slice(0, 10) : ""}
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
        required
      /> */}
      <Button type="submit" variant="contained">
        {submitLabel}
      </Button>
    </Box>
  );
}








