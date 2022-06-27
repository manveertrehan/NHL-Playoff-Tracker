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
        console.log(this.state)
    }

    handleClick(e, valueA, valueB, valueC) {

        for (let i = 0; i < 8; i++) {
            if (this.state.league[valueC].teamRecords[i].team.id === valueA) {

                console.log(e, valueA, valueB, valueC)

                this.setState({
                    team: this.state.league[valueC].teamRecords[i],
                    conference: valueB,
                    division: valueC,
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
                            <div>
                                Record: {this.state.team.leagueRecord.wins}-{this.state.team.leagueRecord.losses}-{this.state.team.leagueRecord.ot}
                            </div>
                            <div>
                                Points: {this.state.team.points} | P%: {this.state.team.pointsPercentage}
                            </div>
                            <div>
                                Division Rank: {this.state.team.divisionRank} | Wilcard Rank: {this.state.team.wildCardRank}
                            </div>
                            <hr>
                            </hr>
                            <div>
                                Right now, the {this.state.league[this.state.division].division.name} Division playoff bar is projected to be at: {Math.round(this.state.wildcard[this.state.division + 2].teamRecords[2].pointsPercentage * 164)} points
                            </div>
                            <div>
                                and the {this.state.league[this.state.division].conference.name} Conference wildcard playoff bar is projected to be at: {Math.round(this.state.wildcard[this.state.conference].teamRecords[1].pointsPercentage * 164)} points
                            </div>
                            <div className="blank">
                                --
                            </div>
                            <div>
                                In order to make the playoffs through a divisional spot, the {this.state.team.team.name} have to achieve a record of:
                               <div>
                                    {this.state.team.points >= Math.round(this.state.wildcard[this.state.division + 2].teamRecords[2].pointsPercentage * 164) ? (
                                        <div className="good">
                                            Nothing! Even if they lose all their remaining games, they are already projected to make the playoffs in a divisional spot
                                        </div>
                                    ) : (
                                            <div>
                                                {this.state.team.points + (2 * (82 - this.state.team.gamesPlayed)) < Math.round(this.state.wildcard[this.state.division + 2].teamRecords[2].pointsPercentage * 164) ? (
                                                    <div className="bad">
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
                            <div className="blank"> - </div>
                            <div>
                                In order to make the playoffs through a wildcard spot, the {this.state.team.team.name} have to achieve a record of:
                               <div>
                                    {this.state.team.points >= Math.round(this.state.wildcard[this.state.conference].teamRecords[1].pointsPercentage * 164) ? (
                                        <div className="good">
                                            Nothing! Even if they lose all their remaining games, they are already projected to make the playoffs in a wildcard spot
                                        </div>
                                    ) : (
                                            <div>
                                                {this.state.team.points + (2 * (82 - this.state.team.gamesPlayed)) < Math.round(this.state.wildcard[this.state.conference].teamRecords[1].pointsPercentage * 164) ? (
                                                    <div className="bad">
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
                            <div className="blank"> -</div>
                            <div>
                                Select another team to see their current playoff status
                            </div>
                            <div className="blank"> -</div>
                            <div className="rowLine">
                                <label className="divheader">
                                    Pacific Division:
                                <div>
                                        <button onClick={e => this.handleClick(this, 24, 1, 3)}>
                                            Anaheim Ducks
                            </button>
                                    </div>
                                    <div>
                                        <button onClick={e => this.handleClick(this, 55, 1, 3)}>
                                            Seattle Kraken
                            </button>
                                    </div>
                                    <div>
                                        <button onClick={e => this.handleClick(this, 20, 1, 3)}>
                                            Calgary Flames
                            </button>
                                    </div>
                                    <div>
                                        <button onClick={e => this.handleClick(this, 22, 1, 3)}>
                                            Edmonton Oilers
                            </button>
                                    </div>
                                    <div>
                                        <button onClick={e => this.handleClick(this, 26, 1, 3)}>
                                            Los Angeles Kings
                            </button>
                                    </div>
                                    <div>
                                        <button onClick={e => this.handleClick(this, 28, 1, 3)}>
                                            San Jose Sharks
                            </button>
                                    </div>
                                    <div>
                                        <button onClick={e => this.handleClick(this, 23, 1, 3)}>
                                            Vancouver Canucks
                            </button>
                                    </div>
                                    <div>
                                        <button onClick={e => this.handleClick(this, 54, 1, 3)}>
                                            Vegas Golden Knights
                            </button>
                                    </div>
                                </label>

                                <label className="divheader">
                                    Central Division:
                                <div>
                                        <button onClick={e => this.handleClick(this, 53, 1, 2)}>
                                            Arizona Coyotes
                            </button>
                                    </div>
                                    <div>
                                        <button onClick={e => this.handleClick(this, 16, 1, 2)}>
                                            Chicago Blackhawks
                            </button>
                                    </div>
                                    <div>
                                        <button onClick={e => this.handleClick(this, 21, 1, 2)}>
                                            Colorado Avalanche
                            </button>
                                    </div>
                                    <div>
                                        <button onClick={e => this.handleClick(this, 25, 1, 2)}>
                                            Dallas Stars
                            </button>
                                    </div>
                                    <div>
                                        <button onClick={e => this.handleClick(this, 30, 1, 2)}>
                                            Minnesota Wild
                            </button>
                                    </div>
                                    <div>
                                        <button onClick={e => this.handleClick(this, 18, 1, 2)}>
                                            Nashville Predators
                            </button>
                                    </div>
                                    <div>
                                        <button onClick={e => this.handleClick(this, 19, 1, 2)}>
                                            St. Louis Blues
                            </button>
                                    </div>
                                    <div>
                                        <button onClick={e => this.handleClick(this, 52, 1, 2)}>
                                            Winnipeg Jets
                            </button>
                                    </div>
                                </label>
                                <label className="divheader">
                                    Atlantic Division:
                                <div>
                                        <button onClick={e => this.handleClick(this, 6, 1, 1)}>
                                            Boston Bruins
                            </button>
                                    </div>
                                    <div>
                                        <button onClick={e => this.handleClick(this, 7, 1, 1)}>
                                            Buffalo Sabres
                            </button>
                                    </div>
                                    <div>
                                        <button onClick={e => this.handleClick(this, 17, 1, 1)}>
                                            Detroit Red Wings
                            </button>
                                    </div>
                                    <div>
                                        <button onClick={e => this.handleClick(this, 13, 1, 1)}>
                                            Florida Panthers
                            </button>
                                    </div>
                                    <div>
                                        <button onClick={e => this.handleClick(this, 8, 1, 1)}>
                                            Montréal Canadiens
                            </button>
                                    </div>
                                    <div>
                                        <button onClick={e => this.handleClick(this, 9, 1, 1)}>
                                            Ottawa Senators
                            </button>
                                    </div>
                                    <div>
                                        <button onClick={e => this.handleClick(this, 14, 1, 1)}>
                                            Tampa Bay Lightning
                            </button>
                                    </div>
                                    <div>
                                        <button onClick={e => this.handleClick(this, 10, 1, 1)}>
                                            Toronto Maple Leafs
                            </button>
                                    </div>
                                </label>
                                <label className="divheader">
                                    Metropolitan Division:
                                <div>
                                        <button onClick={e => this.handleClick(this, 12, 1, 0)}>
                                            Carolina Hurricanes
                            </button>
                                    </div>
                                    <div>
                                        <button onClick={e => this.handleClick(this, 29, 1, 0)}>
                                            Columbus Blue Jackets
                            </button>
                                    </div>
                                    <div>
                                        <button onClick={e => this.handleClick(this, 1, 1, 0)}>
                                            New Jersey Devils
                            </button>
                                    </div>
                                    <div>
                                        <button onClick={e => this.handleClick(this, 2, 1, 0)}>
                                            New York Islanders
                            </button>
                                    </div>
                                    <div>
                                        <button onClick={e => this.handleClick(this, 3, 1, 0)}>
                                            New York Rangers
                            </button>
                                    </div>
                                    <div>
                                        <button onClick={e => this.handleClick(this, 4, 1, 0)}>
                                            Philadelphia Flyers
                            </button>
                                    </div>
                                    <div>
                                        <button onClick={e => this.handleClick(this, 5, 1, 0)}>
                                            Pittsburgh Penguins
                            </button>
                                    </div>
                                    <div>
                                        <button onClick={e => this.handleClick(this, 15, 1, 0)}>
                                            Washington Capitals
                            </button>
                                    </div>
                                </label>
                            </div>
                        </div>
                    )
                }
            </div>
        );

    }
}
