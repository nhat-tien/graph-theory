use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct EdgeData {
    pub text: String,
    pub marker: bool
}

#[derive(Deserialize)]
pub struct Edge {
    pub id: String,
    pub source: String,
    pub target: String,
    pub data: EdgeData,
    #[serde(rename="type")]
    pub type_name: String,
}

#[derive(Serialize)]
pub struct EdgeDataResponse {
    pub id: String,
    pub weight: i32
}

#[derive(Serialize)]
pub struct EdgeResponse {
    pub include: bool,
    pub edge: EdgeDataResponse
}
