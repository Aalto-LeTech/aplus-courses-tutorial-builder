import React from 'react';
import { Tutorial } from '../tutorial/types';
import { useTextInput } from './items/itemUtils';
import { TextInputListItem } from './items/listItem';
import SingleLineItem from './items/singleLineItem';
import { useGranularEffect } from 'granular-hooks';

type TutorialSettingsProps = {
    selectedTutorial: Tutorial | null;
    updateSelectedTutorial: (updatedTutorial: Tutorial) => void;
};

const TutorialSettings: React.FC<TutorialSettingsProps> = ({
    selectedTutorial,
    updateSelectedTutorial,
}) => {
    const tutorialNameInput = useTextInput('Exercise ID');
    const addDependencyInput = useTextInput('Module name');

    useGranularEffect(
        () => {
            tutorialNameInput.setValue(selectedTutorial?.name ?? '');
        },
        [selectedTutorial],
        [tutorialNameInput]
    );

    const handleChangeTutorialName = () => {
        if (!selectedTutorial) return;
        selectedTutorial.name = tutorialNameInput.value.trim();
        updateSelectedTutorial(selectedTutorial);
    };
    const handleAddDependency = (newDependency: string) => {
        if (!selectedTutorial) return;
        selectedTutorial.moduleDependencies.push(newDependency);
        updateSelectedTutorial(selectedTutorial);
    };

    const handleRemoveDependency = (index: number) => {
        if (!selectedTutorial) return;
        selectedTutorial.moduleDependencies.splice(index, 1);
        updateSelectedTutorial(selectedTutorial);
    };

    return (
        <>
            {selectedTutorial && (
                <div className="bottom-container" id="tutorial-settings">
                    <div className="bottom-item bottom-item-title">
                        <h1>Tutorial {selectedTutorial.name} settings</h1>
                    </div>
                    <SingleLineItem
                        title="Tutorial name (Exercise ID)"
                        info="The JSON key of the tutorial"
                        inputProps={tutorialNameInput}
                        onSubmit={handleChangeTutorialName}
                    />
                    <TextInputListItem
                        title="Module dependencies"
                        info=""
                        inputProps={addDependencyInput}
                        listItems={selectedTutorial.moduleDependencies}
                        onRemoveClick={handleRemoveDependency}
                        onAddClick={handleAddDependency}
                    />
                </div>
            )}
        </>
    );
};

export default TutorialSettings;
