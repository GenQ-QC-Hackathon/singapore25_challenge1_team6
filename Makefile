.PHONY: help setup setup-backend setup-frontend dev dev-backend dev-frontend test clean

# Default target
help:
	@echo "QHack - Quantum Risk Engine"
	@echo "============================"
	@echo ""
	@echo "Available targets:"
	@echo "  make setup         - Install all dependencies (backend + frontend)"
	@echo "  make dev           - Run both backend and frontend in development mode"
	@echo "  make dev-backend   - Run backend server only (port 8000)"
	@echo "  make dev-frontend  - Run frontend server only (port 3000)"
	@echo "  make test          - Run backend tests"
	@echo "  make clean         - Clean build artifacts"
	@echo ""

# Setup all dependencies
setup: setup-backend setup-frontend
	@echo "✅ Setup complete!"

# Setup backend
setup-backend:
	@echo "📦 Installing backend dependencies..."
	cd backend && python3 -m pip install -r requirements.txt

# Setup frontend
setup-frontend:
	@echo "📦 Installing frontend dependencies..."
	cd qhack-frontend && npm install

# Run both services (requires two terminals or use tmux/screen)
dev:
	@echo "🚀 Starting both backend and frontend..."
	@echo "Backend will run on http://localhost:8000"
	@echo "Frontend will run on http://localhost:3000"
	@echo ""
	@echo "Run 'make dev-backend' in one terminal and 'make dev-frontend' in another"

# Run backend development server
dev-backend:
	@echo "🚀 Starting backend server on http://localhost:8000..."
	@echo "API docs available at http://localhost:8000/docs"
	cd backend && python3 -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Run frontend development server
dev-frontend:
	@echo "🚀 Starting frontend server on http://localhost:3000..."
	cd qhack-frontend && npm run dev

# Run tests
test:
	@echo "🧪 Running backend tests..."
	cd backend && python3 -m pytest tests/ -v

# Clean build artifacts
clean:
	@echo "🧹 Cleaning build artifacts..."
	find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
	find . -type d -name ".pytest_cache" -exec rm -rf {} + 2>/dev/null || true
	find . -type d -name "*.egg-info" -exec rm -rf {} + 2>/dev/null || true
	cd qhack-frontend && rm -rf .next node_modules/.cache 2>/dev/null || true
	@echo "✅ Clean complete!"
