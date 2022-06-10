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
    const handleChangeTutorialName = (newName: string) => {
        if (!selectedTutorial) return;
        selectedTutorial.name = newName.trim();
        updateSelectedTutorial(selectedTutorial);
    };
    const handleAddDependency = (newDependency: string) => {
        if (!selectedTutorial) return;
        selectedTutorial.moduleDependencies.push(newDependency);
        updateSelectedTutorial(selectedTutorial);
    };
    const handleDependencyChange = (index: number, value: string) => {
        if (!selectedTutorial) return;
        selectedTutorial.moduleDependencies[index] = value;
        updateSelectedTutorial(selectedTutorial);
    };

    const handleRemoveDependency = (index: number) => {
        if (!selectedTutorial) return;
        selectedTutorial.moduleDependencies.splice(index, 1);
        updateSelectedTutorial(selectedTutorial);
    };

    const tutorialNameInput = useTextInput(
        'Exercise ID',
        handleChangeTutorialName
    );
    const addDependencyInput = useTextInput('Module name', handleAddDependency);

    useGranularEffect(
        () => {
            tutorialNameInput.setValue(selectedTutorial?.name ?? '');
        },
        [selectedTutorial],
        [tutorialNameInput]
    );

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
                    />
                    <TextInputListItem
                        title="Module dependencies"
                        info=""
                        inputProps={addDependencyInput}
                        listItems={selectedTutorial.moduleDependencies}
                        onRemoveClick={handleRemoveDependency}
                        onSaveClick={handleDependencyChange}
                    />
                </div>
            )}
        </>
    );
};

export default TutorialSettings;
