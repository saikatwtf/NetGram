#!/usr/bin/env python3
"""
NetGram Setup Script
Helps set up the development environment
"""

import os
import subprocess
import sys

def run_command(command, cwd=None):
    """Run a command and return success status"""
    try:
        result = subprocess.run(command, shell=True, cwd=cwd, check=True)
        return True
    except subprocess.CalledProcessError:
        return False

def setup_bot():
    """Setup bot dependencies"""
    print("🤖 Setting up Telegram Bot...")
    if run_command("pip install -r requirements.txt", cwd="bot"):
        print("✅ Bot dependencies installed")
        return True
    else:
        print("❌ Failed to install bot dependencies")
        return False

def setup_backend():
    """Setup backend dependencies"""
    print("🚀 Setting up Backend API...")
    if run_command("pip install -r requirements.txt", cwd="backend"):
        print("✅ Backend dependencies installed")
        return True
    else:
        print("❌ Failed to install backend dependencies")
        return False

def setup_frontend():
    """Setup frontend dependencies"""
    print("🎨 Setting up Frontend...")
    if run_command("npm install", cwd="frontend"):
        print("✅ Frontend dependencies installed")
        return True
    else:
        print("❌ Failed to install frontend dependencies")
        return False

def create_env_files():
    """Create environment files from examples"""
    print("📝 Creating environment files...")
    
    env_files = [
        ("bot/.env", "bot/.env.example"),
        ("backend/.env", "backend/.env.example"),
        ("frontend/.env.local", "frontend/.env.example")
    ]
    
    for env_file, example_file in env_files:
        if not os.path.exists(env_file):
            if os.path.exists(example_file):
                with open(example_file, 'r') as f:
                    content = f.read()
                with open(env_file, 'w') as f:
                    f.write(content)
                print(f"✅ Created {env_file}")
            else:
                print(f"⚠️  Example file {example_file} not found")

def main():
    """Main setup function"""
    print("🎬 NetGram Setup Script")
    print("=" * 50)
    
    # Check if we're in the right directory
    if not os.path.exists("README.md"):
        print("❌ Please run this script from the NetGram root directory")
        sys.exit(1)
    
    success = True
    
    # Setup components
    success &= setup_bot()
    success &= setup_backend()
    success &= setup_frontend()
    
    # Create environment files
    create_env_files()
    
    print("\n" + "=" * 50)
    if success:
        print("🎉 Setup completed successfully!")
        print("\n📋 Next steps:")
        print("1. Edit .env files with your configuration")
        print("2. Start MongoDB Atlas cluster")
        print("3. Run components:")
        print("   - Bot: cd bot && python main.py")
        print("   - Backend: cd backend && python main.py")
        print("   - Frontend: cd frontend && npm run dev")
    else:
        print("❌ Setup completed with errors")
        print("Please check the error messages above")

if __name__ == "__main__":
    main()