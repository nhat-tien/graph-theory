use std::fs;

use tauri::api::dialog::blocking::FileDialogBuilder;

// struct NodeData {
//     label: String
// }
//
// struct EdgeData {
//     text: String,
//     marker: bool
// }
//
// struct Position {
//     x: i32,
//     y: i32,
// }
//
// struct Node {
//     id: String,
//     type_name: String,
//     position: Position,
//     data: NodeData
// }
//
// struct Edge {
//     id: String,
//     source: String,
//     target: String,
//     data: EdgeData,
//     type_name: String
// } 

#[tauri::command]
pub async fn open_file() -> Option<String> {
    let file_path = FileDialogBuilder::new()
        .add_filter("json", &["json"])
        .pick_file()?;
    file_path.into_os_string().into_string().ok()
}

#[tauri::command]
pub async fn get_location_to_save() -> Option<String> {
    let file_path = FileDialogBuilder::new()
        .set_file_name("graph.json")
        .save_file()?;
    file_path.into_os_string().into_string().ok()
}

#[tauri::command]
pub fn write_file(file_path: String, content: String) -> Result<(), String>   {
    fs::write(file_path, content).map_err(|err| err.to_string())?;
    Ok(())
}

#[tauri::command]
pub fn read_file(file_path: String) ->  Result<String, String>{
    let content: String = fs::read_to_string(file_path).map_err(|err| err.to_string())?;
    Ok(content)
}


