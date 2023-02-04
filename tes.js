<main>
  <Droppable droppableId="drop-id">
    {(provided) => (
      <div ref={provided.innerRef} {...provided.droppableProps}>
        {items.map((item, i) => (
          <div key={item}>
            <Draggable draggableId={item} index={i}>
              {(provided) => (
                <div
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                  className="mt-4 p-2 border rounded-sm"
                >
                  {item}
                </div>
              )}
            </Draggable>
          </div>
        ))}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
</main>;
