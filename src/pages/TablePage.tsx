import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import useItems from '../hooks/useItems';
import styles from './TablePage.module.css';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import ItemRow from '../components/ItemRow';

export default function TablePage() {
  const {
    items,
    toggleSelect,
    selected,
    handleScroll,
    handleDragEnd,
    search,
    setSearch,
  } = useItems();

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h2 className={styles.title}>Список элементов</h2>
        <div className={styles.searchWrapper}>
          <SearchBar value={search} onChange={setSearch} />
        </div>
      </header>

      <div className={styles.listWrapper} onScroll={handleScroll}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="list">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={styles.droppable}
              >
                {items.length === 0 && <Loader />}

                {items.map((item, index) => (
                  <Draggable
                    key={item}
                    draggableId={item.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <ItemRow
                        ref={provided.innerRef}
                        item={item}
                        checked={selected.has(item)}
                        onChange={() => toggleSelect(item)}
                        draggableProps={provided.draggableProps}
                        dragHandleProps={provided.dragHandleProps}
                      />
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}
