// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

pub mod file_command;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            greet,
            file_command::open_file,
            file_command::get_location_to_save,
            file_command::read_file,
            file_command::write_file,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
