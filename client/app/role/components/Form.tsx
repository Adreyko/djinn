import { useForm } from '@/shared/hooks/useForm';
import React, { useState } from 'react';

const initForm = {};

const Form = () => {
  const [step, setStep] = useState(0);
  const [form, handleFormChange, resetForm] = useForm(initForm);

  return <div>Form</div>;
};

export default Form;
