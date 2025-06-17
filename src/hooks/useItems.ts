import { useEffect, useState, useCallback } from 'react';
import { getItems, postSelect, postSort } from '../services/api';

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

export default function useItems() {
  const [items, setItems] = useState<{ id: number; selected: boolean }[]>([]);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const debouncedSearch = useDebounce(search, 400);

  const load = useCallback(async (newOffset: number, reset = false) => {
    setLoading(true);
    const res = await getItems({
      offset: newOffset,
      limit: 20,
      search: debouncedSearch,
    });

    setItems((prev) => reset ? res : [...prev, ...res]);
    setOffset(newOffset + res.length);
    setHasMore(res.length === 20);
    setLoading(false);
  }, [debouncedSearch]);

  useEffect(() => {
    setOffset(0);
    load(0, true);
  }, [debouncedSearch]);

  const toggleSelect = (id: number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
    const target = items.find(item => item.id === id);
    if (target) {
      postSelect({ id, selected: !target.selected });
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 100 && hasMore && !loading) {
      load(offset);
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const fromIndex = result.source.index;
    const toIndex = result.destination.index;

    const fromId = items[fromIndex].id;
    const toId = items[toIndex].id;

    const updated = [...items];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setItems(updated);

    if (fromId !== toId) {
      postSort({ fromId, toId });
    }
  };

  return {
    items,
    loading,
    hasMore,
    search,
    setSearch,
    toggleSelect,
    handleScroll,
    handleDragEnd,
  };
}
