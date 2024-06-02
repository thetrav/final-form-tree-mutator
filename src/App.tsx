import "./App.css";
import arrayMutators from "final-form-arrays";
import React from "react";

import { Form, Field, useForm } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import { reParent } from "./reParent";

const initialValues = {
  nodes: [
    {
      value: "a",
      nodes: [
        { value: "a.a", nodes: [], parent: "a" },
        { value: "a.b", nodes: [], parent: "a" },
      ],
      parent: null,
    },
    {
      value: "b",
      nodes: [
        { value: "b.a", nodes: [], parent: "b" },
        { value: "b.b", nodes: [], parent: "b" },
      ],
      parent: null,
    },
  ],
};

const Node: React.FC<{ name: string }> = ({ name }) => {
  const form = useForm();
  return (
    <div>
      <Field
        name={`${name}.value`}
        component="input"
        type="text"
        placeholder="field value"
      />
      <Field
        name={`${name}.parent`}
        component="select"
        onChange={(e: { target: { value: string } }) => {
          console.log(`reparent ${name} to ${e.target.value}`);
          form.mutators.reParent(name, e.target.value);
        }}
      >
        <option />
        <option value="a">A</option>
        <option value="b">B</option>
      </Field>
    </div>
  );
};

const Nodes: React.FC<{ name: string }> = ({ name }) => {
  return (
    <FieldArray name={`${name}.nodes`}>
      {({ fields }) =>
        fields.map((n, i) => (
          <React.Fragment key={i}>
            <Node name={n} />
            <Nodes name={`${n}.nodes`} />
          </React.Fragment>
        ))
      }
    </FieldArray>
  );
};

function App() {
  const onSubmit = (v: any) => console.log(`Submitting! %o`, v);

  return (
    <>
      <h1>🏁 Final Form</h1>
      <h2>Structure Tester</h2>
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        mutators={{
          ...arrayMutators,
          reParent,
        }}
        render={({ handleSubmit, form, invalid, pristine }) => (
          <form onSubmit={handleSubmit}>
            <FieldArray name={`nodes`}>
              {({ fields }) => fields.map((n, i) => <Nodes key={i} name={n} />)}
            </FieldArray>
            <div className="buttons">
              {pristine && <p>PRISTINE</p>}
              <button type="submit" disabled={invalid && !pristine}>
                submit
              </button>
              <button onClick={() => form.reset()}>reset</button>
            </div>
          </form>
        )}
      />
    </>
  );
}

export default App;
