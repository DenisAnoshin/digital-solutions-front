import { useEffect, useState, useCallback } from 'react';
import { getItems, getState, postSelect, postSort } from '../services/api';

export default function useItems() {
  const [items, setItems] = useState<number[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const load = useCallback(async (newOffset: number) => {
    setLoading(true);
    const res = await getItems({ offset: newOffset, limit: 20, search });
    setItems((prev) => newOffset === 0 ? res : [...prev, ...res]);
    setOffset(newOffset + 20);
    setHasMore(res.length === 20);
    setLoading(false);
  }, [search]);

  const loadState = async () => {
    const res = await getState();
    setSelected(new Set(res.selected));
  };

  useEffect(() => {
    loadState();
    load(0);
  }, [search]);

  const toggleSelect = (id: number) => {
    const updated = new Set(selected);
    updated.has(id) ? updated.delete(id) : updated.add(id);
    setSelected(updated);
    postSelect(Array.from(updated));
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop === clientHeight && hasMore && !loading) {
      load(offset);
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const updated = [...items];
    const [moved] = updated.splice(result.source.index, 1);
    updated.splice(result.destination.index, 0, moved);
    setItems(updated);
    postSort(updated);
  };

  return {
    items,
    selected,
    loading,
    hasMore,
    search,
    setSearch,
    toggleSelect,
    handleScroll,
    handleDragEnd
  };
}
