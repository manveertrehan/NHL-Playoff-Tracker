import React from 'react';

export default class FetchNHLStats extends React.Component {

    state = {
        loading: true,
        wildcard: null,
        league: null,
        conference: null,
        division: null,
        team: null
    }

    async componentDidMount() {
        const url = "https://statsapi.web.nhl.com/api/v1/standings";
        const response = await fetch(url);
        const data = await response.json();

        const url2 = "https://statsapi.web.nhl.com/api/v1/standings/wildCardWithLeaders?";
        const response2 = await fetch(url2);
        const wcdata = await response2.json();

        this.setState({
            league: data.records,
            wildcard: wcdata.records,
            team: data.records[3].teamRecords[4],
            conference: 1,
            division: 3,
            loading: false,
        })
    }

    handleClick(e, teamID, conf, teamDiv) {

        for (let i = 0; i < 8; i++) {
            if (this.state.league[teamDiv].teamRecords[i].team.id === teamID) {

                this.setState({
                    team: this.state.league[teamDiv].teamRecords[i],
                    conference: conf,
                    division: teamDiv,
                    loading: false
                })
            }
        }
    }

    render() {
        return (
            <div>
                {this.state.loading || !this.state.team ? (
                    <div>loading...</div>
                ) : (
                        <div>
                            <h1 className="header1">
                                {this.state.team.team.name}
                            </h1>
                                Record: {this.state.team.leagueRecord.wins}-{this.state.team.leagueRecord.losses}-{this.state.team.leagueRecord.ot}
                                <br></br>
                                Points: {this.state.team.points} | P%: {this.state.team.pointsPercentage.toFixed(3)}
                                <br></br>
                                Division Rank: {this.state.team.divisionRank} | Wilcard Rank: {this.state.team.wildCardRank}
                            <hr>
                            </hr>
                                Right now, the {this.state.league[this.state.division].division.name} Division playoff bar is projected to be at: {Math.round(this.state.wildcard[this.state.division + 2].teamRecords[2].pointsPercentage * 164)} points
                                <br></br>
                                and the {this.state.league[this.state.division].conference.name} Conference wildcard playoff bar is projected to be at: {Math.round(this.state.wildcard[this.state.conference].teamRecords[1].pointsPercentage * 164)} points
                            <br></br><br></br>
                            <div>
                                In order to make the playoffs through a divisional spot, the {this.state.team.team.name} have to achieve a record of:
                               <div>
                                    {this.state.team.points >= Math.round(this.state.wildcard[this.state.division + 2].teamRecords[2].pointsPercentage * 164) ? (
                                        <div style={{color:'green'}}>
                                            Nothing! Even if they lose all their remaining games, they are already projected to make the playoffs in a divisional spot
                                        </div>
                                    ) : (
                                            <div>
                                                {this.state.team.points + (2 * (82 - this.state.team.gamesPlayed)) < Math.round(this.state.wildcard[this.state.division + 2].teamRecords[2].pointsPercentage * 164) ? (
                                                    <div style={{color:'red'}}>
                                                        Even if they win all their remaining games, they are projected to miss the divisional spot
                                                    </div>
                                                ) : (
                                                        <div className="record">
                                                            {Math.floor((Math.round(this.state.wildcard[this.state.division + 2].teamRecords[2].pointsPercentage * 164) + 1 - this.state.team.points) / 2)}-
                                                            {Math.floor(82 - this.state.team.gamesPlayed - ((Math.round(this.state.wildcard[this.state.division + 2].teamRecords[2].pointsPercentage * 164) + 1 - this.state.team.points) / 2))}-
                                                            {82 - this.state.team.gamesPlayed - Math.floor((Math.round(this.state.wildcard[this.state.division + 2].teamRecords[2].pointsPercentage * 164) + 1 - this.state.team.points) / 2)
                                                                - Math.floor(82 - this.state.team.gamesPlayed - ((Math.round(this.state.wildcard[this.state.division + 2].teamRecords[2].pointsPercentage * 164) + 1 - this.state.team.points) / 2))}
                                                        </div>
                                                    )}
                                            </div>
                                        )}
                                </div>
                            </div>
                            <br></br>
                            <div>
                                In order to make the playoffs through a wildcard spot, the {this.state.team.team.name} have to achieve a record of:
                               <div>
                                    {this.state.team.points >= Math.round(this.state.wildcard[this.state.conference].teamRecords[1].pointsPercentage * 164) ? (
                                        <div style={{color:'green'}}>
                                            Nothing! Even if they lose all their remaining games, they are already projected to make the playoffs in a wildcard spot
                                        </div>
                                    ) : (
                                            <div>
                                                {this.state.team.points + (2 * (82 - this.state.team.gamesPlayed)) < Math.round(this.state.wildcard[this.state.conference].teamRecords[1].pointsPercentage * 164) ? (
                                                    <div style={{color:'red'}}>
                                                        Even if they win all their remaining games, they are projected to miss the wildcard spot
                                                    </div>
                                                ) : (
                                                        <div className="record">
                                                            {Math.floor((Math.round(this.state.wildcard[this.state.conference].teamRecords[1].pointsPercentage * 164) + 1 - this.state.team.points) / 2)}-
                                                            {Math.floor(82 - this.state.team.gamesPlayed - ((Math.round(this.state.wildcard[this.state.conference].teamRecords[1].pointsPercentage * 164) + 1 - this.state.team.points) / 2))}-
                                                            {82 - this.state.team.gamesPlayed - Math.floor((Math.round(this.state.wildcard[this.state.conference].teamRecords[1].pointsPercentage * 164) + 1 - this.state.team.points) / 2)
                                                                - Math.floor(82 - this.state.team.gamesPlayed - ((Math.round(this.state.wildcard[this.state.conference].teamRecords[1].pointsPercentage * 164) + 1 - this.state.team.points) / 2))}
                                                        </div>
                                                    )}
                                            </div>
                                        )}
                                </div>
                            </div>
                            <br></br>
                            <div>
                                Select another team to see their current playoff status
                            </div>
                            <br></br>
                            <div className="rowLine">
                                <label className="divheader">
                                    Pacific Division:
                                        <button onClick={e => this.handleClick(this, 24, 1, 3)}>
                                            Anaheim Ducks
                            </button>
                                        <button onClick={e => this.handleClick(this, 55, 1, 3)}>
                                            Seattle Kraken
                            </button>
                                        <button onClick={e => this.handleClick(this, 20, 1, 3)}>
                                            Calgary Flames
                            </button>
                                        <button onClick={e => this.handleClick(this, 22, 1, 3)}>
                                            Edmonton Oilers
                            </button>
                                        <button onClick={e => this.handleClick(this, 26, 1, 3)}>
                                            Los Angeles Kings
                            </button>
                                        <button onClick={e => this.handleClick(this, 28, 1, 3)}>
                                            San Jose Sharks
                            </button>
                                        <button onClick={e => this.handleClick(this, 23, 1, 3)}>
                                            Vancouver Canucks
                            </button>
                                        <button onClick={e => this.handleClick(this, 54, 1, 3)}>
                                            Vegas Golden Knights
                            </button>
                                </label>

                                <label className="divheader">
                                    Central Division:
                                        <button onClick={e => this.handleClick(this, 53, 1, 2)}>
                                            Arizona Coyotes
                            </button>
                                        <button onClick={e => this.handleClick(this, 16, 1, 2)}>
                                            Chicago Blackhawks
                            </button>
                                        <button onClick={e => this.handleClick(this, 21, 1, 2)}>
                                            Colorado Avalanche
                            </button>
                                        <button onClick={e => this.handleClick(this, 25, 1, 2)}>
                                            Dallas Stars
                            </button>
                                        <button onClick={e => this.handleClick(this, 30, 1, 2)}>
                                            Minnesota Wild
                            </button>
                                        <button onClick={e => this.handleClick(this, 18, 1, 2)}>
                                            Nashville Predators
                            </button>
                                        <button onClick={e => this.handleClick(this, 19, 1, 2)}>
                                            St. Louis Blues
                            </button>
                                        <button onClick={e => this.handleClick(this, 52, 1, 2)}>
                                            Winnipeg Jets
                            </button>
                                </label>
                                <label className="divheader">
                                    Atlantic Division:
                                        <button onClick={e => this.handleClick(this, 6, 1, 1)}>
                                            Boston Bruins
                            </button>
                                        <button onClick={e => this.handleClick(this, 7, 1, 1)}>
                                            Buffalo Sabres
                            </button>
                                        <button onClick={e => this.handleClick(this, 17, 1, 1)}>
                                            Detroit Red Wings
                            </button>
                                        <button onClick={e => this.handleClick(this, 13, 1, 1)}>
                                            Florida Panthers
                            </button>
                                        <button onClick={e => this.handleClick(this, 8, 1, 1)}>
                                            Montréal Canadiens
                            </button>
                                        <button onClick={e => this.handleClick(this, 9, 1, 1)}>
                                            Ottawa Senators
                            </button>
                                        <button onClick={e => this.handleClick(this, 14, 1, 1)}>
                                            Tampa Bay Lightning
                            </button>
                                        <button onClick={e => this.handleClick(this, 10, 1, 1)}>
                                            Toronto Maple Leafs
                            </button>
                                </label>
                                <label className="divheader">
                                    Metropolitan Division:
                                        <button onClick={e => this.handleClick(this, 12, 1, 0)}>
                                            Carolina Hurricanes
                            </button>
                                        <button onClick={e => this.handleClick(this, 29, 1, 0)}>
                                            Columbus Blue Jackets
                            </button>
                                        <button onClick={e => this.handleClick(this, 1, 1, 0)}>
                                            New Jersey Devils
                            </button>
                                        <button onClick={e => this.handleClick(this, 2, 1, 0)}>
                                            New York Islanders
                            </button>
                                        <button onClick={e => this.handleClick(this, 3, 1, 0)}>
                                            New York Rangers
                            </button>
                                        <button onClick={e => this.handleClick(this, 4, 1, 0)}>
                                            Philadelphia Flyers
                            </button>
                                        <button onClick={e => this.handleClick(this, 5, 1, 0)}>
                                            Pittsburgh Penguins
                            </button>
                                        <button onClick={e => this.handleClick(this, 15, 1, 0)}>
                                            Washington Capitals
                            </button>
                                </label>
                            </div>
                        </div>
                    )
                }
            </div>
        );

    }
}
