import { useCallback } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import cuid from "cuid";

import useDialogue from "~/hooks/useDialogue";
import styles from "~/styles/AddOptionForm.module.css";

const AddOptionForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const { options, setOptions, NPCs, setNPCs, activeNPC, activeOption } = useDialogue();

  const submitHandler = useCallback(({ text }) => {
    let optionsCopy = { ...options };
    let id = cuid();
    optionsCopy[id] = { id, text };

    if (activeOption) {
      let opt = optionsCopy[activeOption];
      if (opt.responses) {
        opt.responses.push(id);
      } else {
        opt.responses = [id];
      }
    }

    let NPCCopy = { ...NPCs };
    let npc = NPCCopy[activeNPC];
    if (npc.options) {
      npc.options.push(id);
    } else {
      npc.options = [id];
    }

    setOptions(optionsCopy);
    setNPCs(NPCCopy)

    reset();
  }, [options, setOptions, reset, NPCs, setNPCs, activeNPC, activeOption]);

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <input {...register("text")} />
        <button type="submit">Add option</button>
      </form>
    </div>
  );
};

export default AddOptionForm;
