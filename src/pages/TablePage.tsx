import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import useItems from '../hooks/useItems';
import styles from './TablePage.module.css';

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
          <input
            type="text"
            placeholder="Поиск"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
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
                {items.length === 0 && (
                  <div className={styles.loading}>⏳ Загрузка...</div>
                )}

                {items.map((item, index) => (
                  <Draggable
                    key={item}
                    draggableId={item.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={styles.item}
                        style={provided.draggableProps.style}
                      >
                        <label className={styles.itemLabel}>
                          <input
                            type="checkbox"
                            checked={selected.has(item)}
                            onChange={() => toggleSelect(item)}
                            className={styles.checkbox}
                          />
                          {item}
                        </label>
                      </div>
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
