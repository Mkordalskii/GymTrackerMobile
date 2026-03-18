import React, {useMemo, useState} from 'react';

import {exercises, ExerciseFilter, TabKey} from './src/data/mockData';
import {MainLayout} from './src/layouts/MainLayout';
import {ExercisesScreen} from './src/screens/ExercisesScreen';
import {HomeScreen} from './src/screens/HomeScreen';
import {PlaceholderScreen} from './src/screens/PlaceholderScreen';

function App(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] =
    useState<ExerciseFilter>('Wszystkie');

  const filteredExercises = useMemo(() => {
    return exercises.filter(item => {
      const matchesFilter =
        selectedFilter === 'Wszystkie' || item.category === selectedFilter;
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchText.trim().toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [searchText, selectedFilter]);

  const currentTitle = activeTab === 'home' ? 'Dashboard' : 'Cwiczenia';

  return (
    <MainLayout
      title={currentTitle}
      actionLabel={activeTab === 'home' ? '+' : '...'}
      activeTab={activeTab}
      onTabPress={setActiveTab}>
      {activeTab === 'home' ? <HomeScreen /> : null}
      {activeTab === 'exercises' ? (
        <ExercisesScreen
          filteredExercises={filteredExercises}
          searchText={searchText}
          selectedFilter={selectedFilter}
          onSearchChange={setSearchText}
          onFilterChange={setSelectedFilter}
        />
      ) : null}
      {activeTab !== 'home' && activeTab !== 'exercises' ? (
        <PlaceholderScreen tab={activeTab} />
      ) : null}
    </MainLayout>
  );
}

export default App;
