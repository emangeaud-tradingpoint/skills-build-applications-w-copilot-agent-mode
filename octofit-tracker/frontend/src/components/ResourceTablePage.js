import { useEffect, useMemo, useState } from 'react';

function ResourceTablePage({
  title,
  description,
  resourceName,
  endpoint,
  columns,
  getRowTitle,
  getRowSummary,
}) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    console.log(`${resourceName} endpoint:`, endpoint);

    const fetchItems = async () => {
      try {
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`${resourceName} request failed with status ${response.status}`);
        }

        const data = await response.json();
        const normalizedItems = Array.isArray(data) ? data : Array.isArray(data?.results) ? data.results : [];

        console.log(`${resourceName} fetched data:`, data);
        setItems(normalizedItems);
      } catch (fetchError) {
        console.error(`${resourceName} fetch error:`, fetchError);
        setError(fetchError.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, [endpoint, resourceName]);

  const filteredItems = useMemo(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase();

    if (!normalizedTerm) {
      return items;
    }

    return items.filter((item) => JSON.stringify(item).toLowerCase().includes(normalizedTerm));
  }, [items, searchTerm]);

  return (
    <section className="resource-panel">
      <div className="row g-4 align-items-stretch mb-4">
        <div className="col-lg-8">
          <div className="card resource-summary-card h-100">
            <div className="card-body p-4">
              <h2 className="h1 mb-2">{title}</h2>
              <p className="resource-meta mb-4">{description}</p>
              <div className="resource-toolbar">
                <form className="row g-2 align-items-end" onSubmit={(event) => event.preventDefault()}>
                  <div className="col-sm-auto">
                    <label className="form-label fw-semibold" htmlFor={`${resourceName}-search`}>
                      Filter rows
                    </label>
                    <input
                      id={`${resourceName}-search`}
                      className="form-control"
                      type="search"
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                      placeholder={`Search ${title.toLowerCase()}`}
                    />
                  </div>
                  <div className="col-sm-auto">
                    <button className="btn btn-outline-secondary" type="button" onClick={() => setSearchTerm('')}>
                      Clear
                    </button>
                  </div>
                </form>
                <div className="resource-actions">
                  <a className="btn btn-link link-primary text-decoration-none" href={endpoint} target="_blank" rel="noreferrer">
                    Open API endpoint
                  </a>
                  <button className="btn btn-primary" type="button" onClick={() => window.location.reload()}>
                    Refresh app
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card h-100 resource-summary-card">
            <div className="card-body p-4">
              <h3 className="h5 mb-3">Summary</h3>
              <div className="resource-summary-number">{filteredItems.length}</div>
              <p className="text-muted mb-0">Visible rows after filtering.</p>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? <div className="alert alert-info resource-loading">Loading {title.toLowerCase()}...</div> : null}
      {error ? <div className="alert alert-danger resource-error">{error}</div> : null}

      {!isLoading && !error ? (
        <div className="card resource-table-card">
          <div className="card-header bg-white d-flex justify-content-between align-items-center flex-wrap gap-2">
            <h3 className="h4 mb-0">{title} Table</h3>
            <span className="badge text-bg-secondary">{filteredItems.length} records</span>
          </div>
          <div className="table-responsive">
            <table className="table table-hover table-striped align-middle mb-0">
              <thead className="table-light">
                <tr>
                  {columns.map((column) => (
                    <th key={column.key} scope="col">{column.label}</th>
                  ))}
                  <th scope="col" className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <tr key={item.id}>
                      {columns.map((column) => (
                        <td key={`${item.id}-${column.key}`}>{column.render(item)}</td>
                      ))}
                      <td className="text-end">
                        <button className="btn btn-sm btn-outline-primary" type="button" onClick={() => setSelectedItem(item)}>
                          View details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="text-center py-4" colSpan={columns.length + 1}>
                      <div className="alert alert-warning resource-empty mb-0">No records match the current filter.</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

      {selectedItem ? (
        <>
          <div className="modal fade show resource-modal" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <div>
                    <h4 className="modal-title mb-1">{getRowTitle(selectedItem)}</h4>
                    <p className="mb-0 opacity-75">{getRowSummary(selectedItem)}</p>
                  </div>
                  <button className="btn-close" type="button" aria-label="Close" onClick={() => setSelectedItem(null)} />
                </div>
                <div className="modal-body">
                  <div className="resource-detail-grid">
                    {Object.entries(selectedItem).map(([key, value]) => (
                      <div className="resource-detail-item" key={key}>
                        <small>{key.replaceAll('_', ' ')}</small>
                        <div>{String(value ?? 'N/A')}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="modal-footer">
                  <a className="btn btn-link link-primary text-decoration-none" href={endpoint} target="_blank" rel="noreferrer">
                    REST endpoint
                  </a>
                  <button className="btn btn-secondary" type="button" onClick={() => setSelectedItem(null)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show resource-modal-backdrop" onClick={() => setSelectedItem(null)} />
        </>
      ) : null}
    </section>
  );
}

export default ResourceTablePage;