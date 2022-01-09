import { useCallback } from "react"

import useDialogue from "~/hooks/useDialogue"
import styles from "~/styles/DialogueOption.module.css"

const DialogueOption = ({ optionName, option, path, activeNPC }) => {
  const { isActiveOption, makeActive } = useDialogue();

  const topClass = isActiveOption(path) ? styles.activeOption : styles.dialogueOption;

  const clickHandler = useCallback(() => {
    makeActive([...path, optionName])
  }, [path, makeActive, optionName]);

  return (
    <div className={topClass}>
      <h3 className={styles.optionName} onClick={clickHandler}>{option.text}</h3>

      <div className={styles.subOptions}>
        {option?.options && (
          Object.entries(option.options).map(([subOptionName, subOption]) => {
            <DialogueOption
              key={optionKey}
              path={[...path, "options", subOption.name]}
              optionName={subOptionName}
              option={subOption}
            />
          })
        ) || null}
      </div>
    </div>
  );
};

export default DialogueOption
