
      {/* THIS IS BAR CHART */}
      <div style={{height: "100%", width: "50%", marginTop:"50px",}}>
      <h1 style={{marginLeft: "100px", width: "40%", textAlign:"start"}}>Your Insights</h1>
        {weights && formattedDates ? (
          <BarChart Weights={weights} Dates={formattedDates} style={{margin: "0"}}/>
        ) : (
          <></>
        )}

    {/* THIS IS CARDS */}
    <Row style={{ paddingLeft:"80px"}}>
        <Col>
            <Card style={{ margin:"0px", backgroundColor:"#1F5E4B", borderRadius:"50px", width:"250px ", height:"auto" }}>
              <Card.Body style={{textAlign:"center"}}>
                <Card.Title style={{ color: "#F6FEFC", fontWeight: "bold", fontSize:"20px" }}>{avgCal}</Card.Title>

                <Card.Text style={{ color: "#F6FEFC", fontWeight: "bold" }}>Avg. Cals Per Day</Card.Text>
              </Card.Body>
            </Card>
            </Col>

            <Col>
            <Card style={{ margin:"0px", backgroundColor:"#1F5E4B", borderRadius:"50px",  width:"250px ", height:"auto" }}>
              <Card.Body style={{textAlign:"center"}}>
                <Card.Title style={{ color: "#F6FEFC", fontWeight: "bold", fontSize:"20px" }}>{diffWeight} kg</Card.Title>

                <Card.Text style={{ color: "#F6FEFC", fontWeight: "bold" }}>{diffWeight < 0 ? "Total Weight Gain" : "Total Weight Loss"}</Card.Text>
              </Card.Body>
            </Card>
            </Col>
          </Row> 
    </div>
    

    <div>
        {exist && completedPlan ? (
          <AnalyticsHomePage completedPlan={completedPlan} />
        ) : (
          <></>
        )}

{currMealPlan ? <PlatesHomepage currMealPlan={currMealPlan} /> : <></>}

  </div>
    